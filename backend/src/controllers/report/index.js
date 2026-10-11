let { PythonShell } =require('python-shell')





let options={
    

    pythonOptions: ['-u'] // This ensures that the output is unbuffered and available immediately

}

const timeout = setTimeout(() => {
    // If 10 seconds pass without a response, return a timeout message
    // res.status(408).json({ message: "Request timeout" });
    console.log("timeout")
}, 10000);  // 10 seconds timeout

  
  PythonShell.run("app.py",options, function(err, res){
    console.log("hellooo");
    console.log(res);

 
})