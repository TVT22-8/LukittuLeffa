import React, { useState } from 'react';
import { Card, Button, CardBody, CardText, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import OuterCard from './OuterCard';

const Homefetch = () => {

    const [finn, setFinn] = useState('');

    const fetchfinnkino = async () => {
        try {
            const response = await fetch(`http://localhost:3002/finnkino/events`);
            const data = await response.json();
            console.log(data);
            setFinn(data);
        } catch (error) {
            console.error('Error fetching movie information:', error);
        }
    };

    return (


        <div>
      <Button onClick={fetchfinnkino}>Fetch</Button>
      <OuterCard>
      {finn && (
        <div style={{display: 'inline-flex', flexDirection: 'row'}}>
          {finn.map((show, index) => (
            <Card key={index} style={{width: '200px', height: '290px'}}>
              {index > 0 && <br />}
              <CardBody>
                <Link to={show.ShowURL}>
                <Card.Img style={{height: "100%", width: "100%"}} src={show.LargeImagePortrait}></Card.Img>
                </Link>
              </CardBody>
            </Card>
            
          ))}
          
        </div>
        
      )}
      </OuterCard>
    </div>

    );
};

export default Homefetch;