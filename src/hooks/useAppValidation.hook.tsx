import {useEffect, useState} from 'react'

export const useAppValidation = ()=> {
  const [isAppInstalled, setIsAppInstalled] = useState<boolean>(false)

  useEffect(()=> {
    checkAppInstalled();
  },[])

  const checkAppInstalled = async () => {
    const schemeToCheck = 'cashiclient'
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = `${schemeToCheck}://`
    document.body.appendChild(iframe)

    let response = false

    const timeout = setTimeout(() => {
      document.body.removeChild(iframe)
    }, 2000)

    window.addEventListener('pagehide', () => {
      clearTimeout(timeout)
      response = true
    })
    setIsAppInstalled(response)
  }

  return { isAppInstalled }
}
