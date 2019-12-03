const formatDate = (date) => {
    const day = (date.getDate() < 10 ? '0' : '') + date.getDate();
    const hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const seconds = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
}

export default formatDate;