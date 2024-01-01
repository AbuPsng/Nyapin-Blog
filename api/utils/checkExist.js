export const isExist = (res, field, name) => {
    console.log(field)
    if (!field) return res.status(404).json({ status: "error", message: `${name} field is missing` })
}

export const isNotExist = (res, field, message) => {
    if (field) return res.status(404).json({ status: "error", message })
}