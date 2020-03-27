
export const errorHandler = (err, history) => {
    if (err) {
        if (err.status === 401 && err.statusText === "Unauthorized") {
            console.log("FFFFF")
            return history.push('/login')
        } else {
            return alert('There was an error processing your request')
        }
    } 
    return alert('There was an error processing your request')
}