const Application = require('../models/applicationModel'); 

exports.createApplication = async (req, res) => {
  const { code, loanName, loanTerm, amount, date, time } = req.body;

  const application = new Application({ 
    code, 
    loanName, 
    loanTerm, 
    amount,  
    date, 
    time,
  });

  try {
    const newApplication = await application.save();
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getAllApplication = async (req, res) => {
  try {
    const application = await Application.find();
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

