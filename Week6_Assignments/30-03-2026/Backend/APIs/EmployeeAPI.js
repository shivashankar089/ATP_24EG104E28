//Create mini-express app(Seperate route)
import exp from 'express'
export const employeeApp = exp.Router()
import { employeeModel } from '../models/EmployeeModel.js'

//DEFINE employee REST API ROUTES

//Create new employee
employeeApp.post('/employees', async (req, res) => {
  try {
    const newEmployee = req.body

    const newEmployeeDocument = new employeeModel(newEmployee)

    const result = await newEmployeeDocument.save()

    console.log('result:', result)

    res.status(201).json({ message: 'employee Created' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
})
// Get all employees
employeeApp.get('/employees', async (req, res) => {
  try {
    const employees = await employeeModel.find()
    res.status(200).json({ message: 'employees', payload: employees })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//Edit a employee by id
employeeApp.put('/employees/:id', async (req, res) => {
  //get modified employee from req
  const modifiedemployee = req.body
  const uid = req.params.id
  //find employee by id & update
  const updatedemployee = await employeeModel.findByIdAndUpdate(
    uid,
    { $set: { ...modifiedemployee } },
    { returnDocument: 'after', runValidators: true }
  )
  //send res
  res
    .status(200)
    .json({ message: 'employee modified', payload: updatedemployee })
})
//Delete a employee by id
employeeApp.delete('/employees/:id', async (req, res) => {
  //get id from req
  const uid = req.params.id
  //find and delete employee by id
  const deletedemployee = await employeeModel.findByIdAndDelete(uid)
  if (!deletedemployee) {
    return res.status(404).json({ message: 'employee not found' })
  }
  //send res
  res
    .status(200)
    .json({ message: 'employee Deleted', payload: deletedemployee })
})
