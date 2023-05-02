import { Grid, Text } from '@chakra-ui/react'
import React from 'react'

export default function ServerEndedMessage() {
  return (
    <Grid placeContent={'center'} minHeight="100svh" backgroundColor="#F2F2F2">
      <Text css={{ textAlign: 'center', fontSize: '5rem' }}>
        Mirrorful Server is off.
      </Text>
      <Text css={{ textAlign: 'center', fontSize: '2rem', color: 'grey' }}>
        To start the server again, go to the terminal and type{' '}
        <Text css={{ textAlign: 'center', color: 'purple' }} as="span">
          yarn run mirrorful
        </Text>{' '}
        OR{' '}
        <Text css={{ textAlign: 'center', color: 'purple' }} as="span">
          npx mirrorful
        </Text>
        OR{' '}
        <Text css={{ textAlign: 'center', color: 'purple' }} as="span">
          pnpm mirrorful
        </Text>
      </Text>
    </Grid>
  )
}