function getLongestString(s1, s2) {
  const result = []
  let firstString = s1.replace(/\s/g, '')
  let secondString = s2.replace(/\s/g, '')
  let maxChars = firstString.length

  if (!firstString.length || !secondString.length) {
    return ''
  }

  if (secondString.length > firstString.length) {
    ;[firstString, secondString] = [secondString, firstString]
    maxChars = firstString.length
  }

  for (let i = 0; i < maxChars; i++) {
    if (firstString[i]) {
      const currentChar = firstString[i]
      const indexOfChar = secondString.indexOf(currentChar)
      if (indexOfChar !== -1) {
        result.push(currentChar)
        secondString = secondString.substring(indexOfChar + 1)
      }
    } else {
      break
    }
  }

  console.log(result.join(''))
}

getLongestString('ABAZDC', 'BACBAD')
getLongestString('aaaa', 'aa')
getLongestString('AGGTAB', 'GXTAYB')
