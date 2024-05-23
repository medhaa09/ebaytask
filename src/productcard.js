import * as React from 'react';
import './productcard.css';
import { Card, CardBody, CardFooter, Stack, Image, Divider, Text, Button, ButtonGroup } from '@chakra-ui/react';
const ProductCard=(props)=> {
  const Img = props.image;
  
  return (
    <div className='product-card' id='animation-4'>
    <Card  maxW="sm" bg="#ddd" >
      <CardBody>
        <Image
          src={Img}
          borderRadius="lg"
        />
        <Stack mt="6" spacing="1.5">
          <Text fontSize="m">{props.name}</Text>
          <Text color="#2D3142" fontSize="s">
           Rs {props.price}
          </Text>
        </Stack>
      </CardBody>
     
    </Card>
    </div>
  );
}
export default ProductCard;