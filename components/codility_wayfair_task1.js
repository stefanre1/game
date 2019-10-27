const MUSIC_FILE_EXTENSIONS = ['.mp3', '.aac', '.flac']
const IMAGE_FILE_EXTENSIONS = ['.jpg', '.bmp', '.gif']
const MOVIES_FILE_EXTENSIONS = ['.mp4', '.avi', '.mkv']
const SIZE_FORMAT = 'b'

function solution(S) {
  // write your code in JavaScript (Node.js 8.9.4)
  const regex = /b/gi
  const categoryDetails = {
    music: 0,
    images: 0,
    movies: 0,
    other: 0
  }

  const fileDetails = S.split('\n').reduce((result, file) => {
    const fileDetails = file.split(' ')
    const extension = fileDetails[0].match(/\.[0-9a-z]+$/i)[0]
    const size = parseInt(fileDetails[1].replace(regex, ''))

    if (MUSIC_FILE_EXTENSIONS.includes(extension)) {
      result.music += size
    } else if (IMAGE_FILE_EXTENSIONS.includes(extension)) {
      result.images += size
    } else if (MOVIES_FILE_EXTENSIONS.includes(extension)) {
      result.movies += size
    } else {
      result.other += size
    }
    return result
  }, categoryDetails)

  let result = ''

  for (const [key, value] of Object.entries(fileDetails)) {
    result += `${key} ${value}${SIZE_FORMAT}\n`
  }
  return result
}
const input =
  'my.song.mp3 11b\ngreatSong.flac 1000b\nnot3.txt 5b\nvideo.mp4 200b\ngame.exe 100b\nmov!e.mkv 10000b'

console.log(solution(input))
