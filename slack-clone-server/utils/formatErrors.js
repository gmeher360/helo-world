export default function (err) {
    if (err.name == "SequelizeValidationError") {
        return err.errors.reduce((errorsArray, error) => {
            errorsArray.push({ message: error.message, path: error.path })
            return errorsArray
        }, []);
    } else if (err.name == "SequelizeUniqueConstraintError") {
        return err.errors.reduce((errorsArray, error) => {
            errorsArray.push({ message: error.message, path: error.path })
            return errorsArray
        }, []);
    }

}