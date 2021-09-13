export const getDate = (date)=>{
    let newDate = `${date.substring(8,10)}/${date.substring(5,7)}/${date.substring(0,4)}`
    return newDate
}