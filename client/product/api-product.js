const create = async (params, credentials, product) => {
    try {
        let response = await fetch('/api/products/new/' + params.userId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: product
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const listByUser = async (params, credentials) => {
    try {
        let response = await fetch('/api/products/by/' + params.userId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const listProducts = async (signal) => {
    try {
        let response = await fetch('/api/products', {
            method: 'GET',
            // signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const remove = async (params, credentials) => {
    try {
        let response = await fetch('/api/products/' + params.productId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


const like = async (params, credentials, productId) => {
    try {
        let response = await fetch('/api/products/like/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({ userId: params.userId, productId: productId })
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


const unlike = async (params, credentials, productId) => {
    try {
        let response = await fetch('/api/products/unlike/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({ userId: params.userId, productId: productId })
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


const comment = async (params, credentials, productId, comment) => {
    try {
        let response = await fetch('/api/products/comment/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({ userId: params.userId, productId: productId, comment: comment })
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


const uncomment = async (params, credentials, productId, comment) => {
    try {
        let response = await fetch('/api/products/uncomment/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({ userId: params.userId, productId: productId, comment: comment })
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const addToCart = async (params, credentials, productId) => {
    try {
        let response = await fetch('/api/products/addCart', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({ userId: params.userId, productId: productId })
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const search = async (params, credentials, signal) => {
    const query = queryString.stringify(params)
    try {
        let response = await fetch(`api/products?${query}`, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
        })
        return response.json()
    } catch (err) {
        console.log(err)
    }
}


export {
    listProducts,
    listByUser,
    create,
    remove,
    like,
    unlike,
    comment,
    uncomment,
    addToCart,
    search,
}

