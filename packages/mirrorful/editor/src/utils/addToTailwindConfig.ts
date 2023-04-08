import fs from 'fs'
import { readdir, readFile, writeFile } from 'fs/promises'
import path from 'path'

type TTokens = 'colors' | 'fontSizes' | 'boxShadows'
const tokens: TTokens[] = ['colors', 'fontSizes', 'boxShadows']

export async function addToTailwindConfig() {
  const rootPath = process.cwd() + '/tailwind.config.js'

  const IS_TAILWIND_BEING_USED = fs.existsSync(rootPath)
  if (!IS_TAILWIND_BEING_USED) return

  const tokenInserts = {
    colors: '\t\t\t\t...mirrorful.Tokens.colors,',
    fontSize: '\t\t\t\t...mirrorful.Tokens.fontSizes,',
    dropShadow: '\t\t\t\t...mirrorful.Tokens.boxShadows,',
  }

  const tailwindInserts = {
    colors: `\t\t\tcolors: {\n${tokenInserts['colors']}\n\t\t\t},`,
    fontSize: `\t\t\tfontSize: {\n${tokenInserts['fontSize']}\n\t\t\t},`,
    dropShadow: `\t\t\tdropShadow: {\n${tokenInserts['dropShadow']}\n\t\t\t},`,
  }

  const [SHOULD_NOT_UPDATE_TAILWIND_CONFIG, tokensUpdateArr] =
    await shouldUpdateTailwindConfig({
      keys: tokens,
      path: rootPath,
    })

  if (SHOULD_NOT_UPDATE_TAILWIND_CONFIG) return

  const mirrorfulFolderPath = await getFolderPath({
    folderName: '.mirrorful',
  })

  if (mirrorfulFolderPath.length < 0) return

  try {
    // opening up extends brackets
    const tailwindFile = (await readFile(rootPath, 'utf8')).replace(
      /{}/g,
      '{\n}'
    )

    const tailwindFileArr = tailwindFile.split('\n')

    updateTailwindFileArr({
      tokensUpdateArr,
      tailwindFileArr,
      tokenInserts,
      ...getExtendThemeIndex(tailwindFileArr),
      tailwindInserts,
      tailwindContainsThemes: doesContainExtendThemes(tailwindFile),
    })

    let mirrorfulImport = ''
    if (!tailwindFile.includes('.mirrorful/theme_cjs.js')) {
      mirrorfulImport = `const mirrorful = require('${mirrorfulFolderPath}/theme_cjs.js')\n`
    }
    await writeFile(
      rootPath,
      mirrorfulImport + tailwindFileArr.join('\n'),
      'utf-8'
    )
  } catch (error) {
    console.error(error)
  }
}
function updateTailwindFileArr({
  tokensUpdateArr,
  tailwindContainsThemes,
  colorsIndex,
  fontSizeIndex,
  dropShadowIndex,
  extendIndex,
  tailwindFileArr,
  tokenInserts,
  tailwindInserts,
}: {
  tokensUpdateArr: Record<TTokens, boolean>
  colorsIndex: number
  fontSizeIndex: number
  dropShadowIndex: number
  extendIndex: number
  tailwindContainsThemes: {
    hasColors: RegExpMatchArray | null
    hasFontSizes: RegExpMatchArray | null
    hasDropShadow: RegExpMatchArray | null
  }
  tailwindFileArr: string[]
  tokenInserts: { colors: string; fontSize: string; dropShadow: string }
  tailwindInserts: { colors: string; fontSize: string; dropShadow: string }
}) {
  if (!tokensUpdateArr['colors']) {
    if (tailwindContainsThemes.hasColors) {
      tailwindFileArr.splice(colorsIndex, 0, tokenInserts['colors'])
      fontSizeIndex++
      dropShadowIndex++
    } else {
      tailwindFileArr.splice(extendIndex, 0, tailwindInserts['colors'])
      extendIndex++
    }
  }

  if (!tokensUpdateArr['fontSizes']) {
    if (tailwindContainsThemes.hasFontSizes) {
      tailwindFileArr.splice(fontSizeIndex, 0, tokenInserts['fontSize'])
      dropShadowIndex++
    } else {
      tailwindFileArr.splice(extendIndex, 0, tailwindInserts['fontSize'])
      extendIndex++
    }
  }

  if (!tokensUpdateArr['boxShadows']) {
    if (tailwindContainsThemes.hasDropShadow) {
      tailwindFileArr.splice(dropShadowIndex, 0, tokenInserts['dropShadow'])
    } else {
      tailwindFileArr.splice(extendIndex, 0, tailwindInserts['dropShadow'])
      extendIndex++
    }
  }
}

function getExtendThemeIndex(tailwindFileArr: string[]) {
  let extendIndex = -1,
    colorsIndex = -1,
    fontSizeIndex = -1,
    dropShadowIndex = -1

  for (let i = 0; i < tailwindFileArr.length; i++) {
    const line = tailwindFileArr[i]
    if (line.includes('extend:')) {
      extendIndex = i + 1
    } else if (line.includes('colors:')) {
      colorsIndex = i + 1
    } else if (line.includes('fontSize:')) {
      fontSizeIndex = i + 1
    } else if (line.includes('dropShadow:')) {
      dropShadowIndex = i + 1
    }
  }
  return { colorsIndex, fontSizeIndex, dropShadowIndex, extendIndex }
}

function doesContainExtendThemes(tailwindFile: string) {
  const hasColors = tailwindFile.match(/colors:(\s|^\s)(\{|\n)/)
  const hasFontSizes = tailwindFile.match(/fontSize:(\s|^\s)(\{|\n)/)
  const hasFontWeights = tailwindFile.match(/fontWeight:(\s|^\s)(\{|\n)/)
  const hasDropShadow = tailwindFile.match(/dropShadow:(\s|^\s)(\{|\n)/)
  return { hasColors, hasFontSizes, hasDropShadow }
}

/**
 *
 * @param keys The tokens generated by mirrorful
 * @param path The path to the tailwind file
 * @returns Boolean
 */
async function shouldUpdateTailwindConfig({
  keys,
  path,
}: {
  keys: Array<TTokens>
  path: string
}) {
  const tailwindFile = await readFile(path, 'utf-8')

  const booleanArr: Record<TTokens, boolean> = {
    colors: false,
    boxShadows: false,
    fontSizes: false,
  }

  for (let i = 0; i < keys.length; i++) {
    const regex = `Tokens.${keys[i]}`
    booleanArr[keys[i]] = tailwindFile.includes(regex)
  }
  return [Object.values(booleanArr).every((a) => a), booleanArr] as const
}

const skipDirs = [
  'node_modules',
  '.next',
  '.git',
  '.pnp',
  'coverage',
  'out',
  'build',
  'lib',
  '.vercel',
]

/**
 *
 * @param folderName Take in the folder name that needs to be found
 * @returns Either an empty string or a folder path
 */
async function getFolderPath({ folderName }: { folderName: string }) {
  const rootDir = process.cwd()
  let finalPath = ''
  const queue = [...(await readdir(rootDir))]
  const visited = []

  while (queue.length > 0) {
    const folder = queue.shift()
    // if the next folder is empty quit
    if (folder === undefined) break
    // skip over the folders that most likely do not contain the folder
    if (skipDirs.includes(folder)) {
      visited.push(folder)
      continue
    }

    // if the path is a folder then check for the name
    if (fs.lstatSync(folder).isDirectory()) {
      if (folder.includes(folderName)) {
        finalPath = folder
        break
      }
      visited.push(folder)
      queue.push(
        ...(await readdir(path.join(rootDir, folder))).map(
          (path) => `${folder}/${path}`
        )
      )
    }
  }

  if (finalPath.length < 0) {
    return ''
  }

  return './' + finalPath
}
