const errorHandler = (err, req, res, next) => {
    console.log(`PATH: ${req.path} - ERROR: ${err.message}`);

    return res.status(500).json({ message: "Server error" });
}

export default errorHandler;