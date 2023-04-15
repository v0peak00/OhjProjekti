const express = require('express');
const router = express.Router();
const car = require('../models/car_model');

// GET all cars
router.get('/', (req, res) => {
  car.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving cars.',
      });
    } else {
      res.send(data);
    }
  });
});

// GET a single car by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;

  car.getById(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Car with id ${id} not found.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving car with id ${id}`,
        });
      }
    } else {
      res.send(data);
    }
  });
});

// CREATE a new car
router.post('/', (req, res) => {
  const { branch, model } = req.body;

  // Validate request
  if (!branch || !model) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  const carData = { branch, model };

  car.add(carData, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the car.',
      });
    } else {
      res.send(data);
    }
  });
});

// UPDATE a car by ID
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { branch, model } = req.body;

  // Validate request
  if (!branch || !model) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  const carData = { branch, model };

  car.update(id, carData, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Car with id ${id} not found.`,
        });
      } else {
        res.status(500).send({
          message: `Error updating car with id ${id}`,
        });
      }
    } else {
      res.send(data);
    }
  });
});

// DELETE a car by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  car.delete(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Car with id ${id} not found.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete car with id ${id}`,
        });
      }
    } else {
      res.send({ message: `Car with id ${id} deleted successfully!` });
    }
  });
});

module.exports = router;