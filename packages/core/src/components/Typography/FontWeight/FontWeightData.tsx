import { Box, Text } from '@chakra-ui/react'
import { TFontWeightVariant } from '@core/types'

export function FontWeightData({
  fontWeightData,
}: {
  fontWeightData: TFontWeightVariant
}) {
  return (
    <>
      <Box>
        <Text css={{ fontWeight: 'bold', width: 100 }} fontSize={18}>
          {fontWeightData.weight}
        </Text>
      </Box>
      <Box
        css={{
          fontSize: '2rem',
          fontWeight: fontWeightData.weight,
          width: '100%',
        }}
      >
        Lorem ipsum dolor sit amet.
      </Box>
    </>
  )
}