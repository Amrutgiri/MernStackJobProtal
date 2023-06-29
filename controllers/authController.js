import userModel from "../models/userModel.js";
export const authController = async (req, res, next) => {

    const { name, email, password } = req.body;
    const user = await userModel.create({ name, email, password });

    const token = user.createJWT();

    res.status(200).send({
        success: true,
        message: "User Created Successfully",
        user: {
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            location: user.location
        },
        token,
    })

}

export const loginController = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        next('Please Provide all Fields');
    }
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        next('Invalid Username Or Password');
    }

    // compar Password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        next("Invalid Username Or Password");
    }
    user.password = undefined;
    const token = user.createJWT();
    res.status(200).send({
        success: true,
        message: "Login Successfully ",
        user,
        token,
    })
}