import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import './App.css';

const App = () => {
  const [weight, setWeight] = useState(0);
  const [plates, setPlates] = useState([]);
  const [remainingWeight, setRemainingWeight] = useState(0);

  const calculatePlates = () => {
    const barbellWeight = 45;
    const availablePlates = [1.25, 2.5, 5, 10, 25, 35, 45];
    const totalWeight = parseFloat(weight);
    
    // Check if the total weight is less than the base weight (45)
    if (totalWeight < barbellWeight) {
      setPlates([]); // Do not add any plates
      setRemainingWeight(totalWeight - barbellWeight);
      return;
    }
    
    const targetWeight = totalWeight - barbellWeight;
    let remainingWeight = targetWeight;
  
    const calculatedPlates = [];
  
    // Loop through the available plates from highest to lowest weight
    for (let i = availablePlates.length - 1; i >= 0; i--) {
      const plateWeight = availablePlates[i];
      const plateCount = Math.floor(remainingWeight / (plateWeight * 2));
  
      // If the plateCount is greater than 0, add the plate pair to the barbell
      if (plateCount > 0) {
        calculatedPlates.push({ weight: plateWeight, count: plateCount });
        remainingWeight -= plateWeight * 2 * plateCount;
        if (remainingWeight === 0) {
          break;
        }
      }
    }
  
    // Handle the remaining weight if it cannot be perfectly balanced
    if (remainingWeight > 0) {
      // Add the smallest available plate pair to accommodate the remaining weight
      const smallestPlate = Math.min(...availablePlates);
      const remainingPlateCount = Math.ceil(remainingWeight / (smallestPlate * 2));
      calculatedPlates.push({ weight: smallestPlate, count: remainingPlateCount });
      remainingWeight -= smallestPlate * 2 * remainingPlateCount;
    }
  
    // Duplicate the calculated plates for both sides of the barbell
    const balancedPlates = [...calculatedPlates.reverse(), ...calculatedPlates.reverse()];
  
    setPlates(balancedPlates);
    setRemainingWeight(remainingWeight); // Display the remaining weight and plates added
  };
  

  return (
    <div className="my-element mx-2 mx-sm-4" style={{marginTop: "20px", color: "#d1cccc"}}>
      <h1 style={{color: "#FFFFFF"}}>Plate Calculator</h1>
      <Form>
        <Form.Group controlId="weightInput" style={{color: "#d1cccc"}}>
          <Form.Label style={{color: "#B3B3B3"}}>Barbell Weight (in lbs):</Form.Label>
          <Form.Control
            style={{
              backgroundColor: "#404040",
              color: "#FFFFFF",
              borderColor: "#181818"
            }}
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // Prevent page refresh
                calculatePlates(); // Call the calculatePlates function
              }
            }}
            placeholder="Enter weight"
          />
        </Form.Group>
        <Button 
          variant="primary" 
          onClick={calculatePlates} 
          block
          style={{
            backgroundColor: "#282828",
            borderColor: "#181818",
            color: "#d3cfcf"
          }}
        >
          Calculate Plates
        </Button>
      </Form>
      {plates.length > 0 && (
        <div>
          <h2 style={{color: "#FFFFFF"}}>Plates Required:</h2>
          <div className="barbell-container">
            <div className="left-side">
              <h3 style={{color: "#FFFFFF"}}>Left Side:</h3>
              <ListGroup>
                {plates.slice(0, Math.ceil(plates.length / 2)).map((plate, index) => (
                  <ListGroup.Item 
                    key={index} 
                    style={{
                      backgroundColor: "#404040",
                      color: "#FFFFFF"
                    }}
                  >
                    {plate.count} x {plate.weight} lb plates
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
            <hr className="bar" />
            <div className="right-side">
              <h3 style={{color: "#FFFFFF"}}>Right Side:</h3>
              <ListGroup>
                {plates.slice(Math.ceil(plates.length / 2)).map((plate, index) => (
                  <ListGroup.Item 
                    key={index} 
                    style={{
                      backgroundColor: "#404040",
                      color: "#FFFFFF"
                    }}
                  >
                    {plate.count} x {plate.weight} lb plates
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </div>
        </div>
      )}

      {remainingWeight !== 0 && (<h2 style={{color: "#FFFFFF"}}>Weight Difference: {remainingWeight} lbs</h2>)}
    </div>
  );

};

export default App;

