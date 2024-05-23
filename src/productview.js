import React, { useState, useRef } from 'react';
import { useParams,Link } from 'react-router-dom';
import Products from './data/data.json';
import './productview.css';
import { 
  Button, Stack, Accordion, AccordionItem, AccordionButton, 
  AccordionPanel, AccordionIcon, Box, AlertDialog, AlertDialogOverlay, 
  AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import Chat from './chat';


const ProductView = () => {
  const { category, id } = useParams();
  const productCategory = category === 'coolers' ? 'Coolers' : 'Mattresses';
  const product = Products.Home[productCategory][id];

  const [mainImage, setMainImage] = useState(product?.image[0] || '');
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false);
  const cancelRef = useRef();

  const handleBuyNowClick = () => setDialogOpen(true);
  const handleConfirmPurchase = () => {
    setDialogOpen(false);
    setChatOpen(true);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleCloseChat = () => {
    setChatOpen(false);
  };

  return (
    <div className="product-view">
      <div className="product-image-section">
        <img src={mainImage} alt={product.name} className="product-image" />
        <div className="product-thumbnails">
          {product.image.map((item, index) => (
            <img 
              src={item} 
              alt={`${product.name}-${index}`} 
              key={index} 
              className="thumbnail-image" 
              onClick={() => setMainImage(item)} 
            />
          ))}
        </div>
      </div>
      <div className="product-details">
        <h1>{product.name}</h1>
        <p className="price">Rs.{product.price}</p>
        
        <div className="product-specs">
          {Object.entries(product).map(([key, value]) => (
            key !== 'image' && key !== 'name' && key !== 'price' && key !== 'seller' && (
              <p key={key}>
                <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {value}
              </p>
            )
          ))}
        </div>
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton sx={{ border: 'none', _focus: { boxShadow: 'none' } }}>
                <Box flex="1" textAlign="left">
                  Seller
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <div className="seller-info">
                <h6>{product.seller.name}</h6>
                <h6>{product.seller.contact}</h6>
                <h6>{product.seller.email}</h6>
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Stack spacing={4} direction='row' align='center' mt={4}>
          <Button 
            colorScheme='green' 
            size='md' 
            sx={{ _focus: { boxShadow: 'none' } }}
            onClick={handleBuyNowClick}
          >
            Buy Now
          </Button>
          <Link to={`/map`}  style={{ textDecoration: 'none' }}>
          <Button 
            colorScheme='teal' 
            size='md' 
            sx={{ _focus: { boxShadow: 'none' } }}
          >
            Seller Location
          </Button>
          </Link>
        </Stack>
      </div>

      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Purchase
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to buy this product?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setDialogOpen(false)}>
                No
              </Button>
              <Button colorScheme="green" onClick={handleConfirmPurchase} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {isChatOpen ? (
        <Chat seller={product.seller} onclose={handleCloseChat} />
      ) : null}

     
    </div>
  );
};

export default ProductView;
