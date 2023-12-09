export function getCurrentDatetimeForUser() {
    return new Date().toLocaleString('default', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })
}

export function convertUnixUtcTimeToLocaleTime(utcTime: number) {
    return new Date(utcTime * 1000).toLocaleString('default', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })
}