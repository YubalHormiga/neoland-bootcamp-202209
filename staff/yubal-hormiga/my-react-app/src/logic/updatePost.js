/* eslint-disable import/no-anonymous-default-export */
/**
 * Updates a post against API
 * 
 * @param {string} token The user id
 * @param {string} postId The post id
 * @param {string} text The post text
 * @param {string} visibility The post visibility
 * @param {callback} callback The callback to attend the result
 */
 export default function(token, postId, text, visibility, callback) {
    if (typeof token !== 'string') throw new TypeError('userId is not a string')
    if (!token.length) throw new Error('userId is empty')
    if (typeof postId !== 'string') throw new TypeError('postId is not a string')
    if (!postId.length) throw new Error('postId is empty')
    if (typeof text !== 'string') throw new TypeError('text is not a string')
    if (!text.length) throw new Error('text is empty')
    if (typeof visibility !== 'string') throw new TypeError('visibility is not a string')
    if (!visibility.length) throw new Error('visibility is empty')
    if (visibility !== 'public' && visibility !== 'private') throw new Error('invalid visibility')
    if (typeof callback !== 'function') throw new TypeError('callback is not a function')
    
    if(!callback)
    return new Promise((resolve,reject)=>{

        const xhr = new XMLHttpRequest()

        xhr.onload = () => {
            const { status, responseText: json } = xhr
    
            if (status >= 500) {
                const { error } = JSON.parse(json)
    
                reject(new Error(error))
    
                return
            }
    
            resolve(null)
        }
    
        xhr.onerror = () => callback(new Error('connection error'))
    
        xhr.open('PATCH', `http://localhost/posts/${postId}`)
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        xhr.setRequestHeader('Content-Type', 'application/json')
    
        const payload = { text, visibility }
    
        const json = JSON.stringify(payload)
    
        xhr.send(json)
    })
    
    
    const xhr = new XMLHttpRequest()

    xhr.onload = () => {
        const { status, responseText: json } = xhr

        if (status >= 500) {
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }

        callback(null)
    }

    xhr.onerror = () => callback(new Error('connection error'))

    xhr.open('PATCH', `http://localhost/posts/${postId}`)
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.setRequestHeader('Content-Type', 'application/json')

    const payload = { text, visibility }

    const json = JSON.stringify(payload)

    xhr.send(json)
}

/**
 * Attends the result of the post updation
 * 
 * @callback callback
 * 
 * @param {Error} error The authentication error
 */