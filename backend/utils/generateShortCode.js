const generateShortCode = () => {
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let shortCode = ""
    let shortCodeLength = 6
    for (let i = 0; i < shortCodeLength; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length)
        let randomChar = characters[randomIndex]
        shortCode += randomChar
    }
    return shortCode
}

module.exports = generateShortCode