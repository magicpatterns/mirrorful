export const DEFAULT_CODE = `
import React from 'react'
import { render } from 'react-dom'

function App(){
    return (
        <div>Hello World</div>
    )
}

render(
    <App />,
    document.getElementById('root')
)
`

export const SOURCE_BOILERPLATE = (iframeCode: string) => `
<html>
<head>
  <link rel="stylesheet" href="/iframe.css">
</head>
<body>
  <div id="root"></div>
  <script type="module">${iframeCode}</script>
</body>
</html>
`