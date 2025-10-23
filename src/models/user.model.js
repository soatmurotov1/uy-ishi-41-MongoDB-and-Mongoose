









userSchema.methods.compasePassword = async (req, res, next) => {
    try {
        const isValidPassword = await bcrypt.compare(userPassword, this.password)
        return isValidPassword
    }catch(error) {
        console.log(error);
        next(error)
    }
}