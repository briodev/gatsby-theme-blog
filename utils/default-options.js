module.exports = themeOptions => {
    const basePath = themeOptions.basePath || `/blog`
    const contentPath = themeOptions.contentPath || `content/posts`
    const tagsPath = themeOptions.tagsPath || `/tags`

    return {
        basePath,
        contentPath,
        tagsPath
    }
}