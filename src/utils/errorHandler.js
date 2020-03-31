
export const errorHandler = (err, history) => {
    console.log(err)
    if (err) {
        if (err.status === 401 && err.statusText === "Unauthorized") {
            return history.push('/login')
        } else {
            return alert('There was an error processing your request')
        }
    } 
    return alert('There was an error processing your request')
}