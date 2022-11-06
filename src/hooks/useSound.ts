import { useEffect, useState } from 'react'

const IsMute = () => {
  const sound = window.localStorage.getItem("sound")
  const [soundEnabled, setSoundEnabled] = useState(sound !== 'false')

  useEffect(() => {
    setSoundEnabled(
      window.localStorage.getItem("sound") !== 'false'
    )
  }, [sound])

  return soundEnabled
}

export default IsMute;
