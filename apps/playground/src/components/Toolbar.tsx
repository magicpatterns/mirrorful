import { Box, Button, Stack, Text } from '@chakra-ui/react'
import TriggerDevLogo from '../assets/triggerdev_logo.png'
import { FiShare2, FiCloudLightning } from 'react-icons/fi'
import { MoonIcon } from '@chakra-ui/icons'
import {
  MirrorfulApiClient,
  MirrorfulApiEnvironment,
} from '@mirrorful-fern/api-client'
import { useParams } from 'react-router-dom'

export function Toolbar({ code }: { code: string }) {
  const { fileId, orgId } = useParams()

  async function onShare() {
    const environment =
      process.env.NODE_ENV === 'production'
        ? MirrorfulApiEnvironment.Production
        : MirrorfulApiEnvironment.Development
    const client = new MirrorfulApiClient({
      environment,
    })
    if (!orgId || !fileId) {
      throw Error('Need :fileId and :orgId')
    } else {
      await client.registry.updateFile(orgId, fileId, {
        code,
      })
      alert(`Share ${window.location.href}. Copy link.`)
    }
  }

  return (
    <Box
      css={{
        width: '100%',
        height: '52px',
        padding: '12px 36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      borderBottomWidth={'1px'}
      borderColor={'divider'}
    >
      <Box css={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={TriggerDevLogo}
          style={{ height: '24px', marginRight: '16px' }}
        />
        <Text css={{ fontSize: '14px', fontWeight: 'bold' }} color="gray.700">
          Component Sandbox by Mirrorful
        </Text>
      </Box>
      <Box>
        <Stack direction="row" spacing={4}>
          <Button
            onClick={() => {
              onShare()
            }}
            variant="primary"
            size="compact"
            leftIcon={<FiShare2 />}
          >
            Share
          </Button>
          <Button
            variant="secondary"
            size="compact"
            leftIcon={<FiCloudLightning />}
            onClick={() => {
              //@ts-ignore
              window
                .open('https://buy.stripe.com/14k7sJaldbRVexGdQU', '_blank')
                .focus()
            }}
          >
            Upgrade
          </Button>
          <Button variant="secondary" size="compact">
            <MoonIcon />
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}