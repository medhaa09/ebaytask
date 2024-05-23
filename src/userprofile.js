import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import './userprofile.css';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import JsonData from './data/data.json';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const Userprofile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const userProfile = JsonData.Userprofile;
    setInitialData(userProfile);
    setFormData(userProfile);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSave = () => {
    const updatedData = { ...formData };
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedData.image = reader.result;
        setInitialData(updatedData);
        setFormData(updatedData);
        setImageFile(null);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setInitialData(updatedData);
      setFormData(updatedData);
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setFormData(initialData);
    setIsOpen(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const comp = useRef(null);
  useLayoutEffect(() => {
    const t1 = gsap.timeline();
    t1.from(["#animation-5"], {
      opacity: 0,
      y: "+=30",
      stagger: 0.5,
    }).from(".profile-img img", {
      opacity: 0,
      scale: 0.5,
      duration: 0.5,
    });
    return () => t1.reverse(); 
  }, []);
  return (
    <div ref={comp}>
      <div className="userprofile">
        <div className="container emp-profile" id='animation-5'>
          <form method="post">
            <div className="row">
              <div className="col-md-4">
                <div className="profile-img">
                  <img src={initialData.image === "" || !initialData.image ? "/image/placeholder.png" : initialData.image} alt="" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="profile-head">
                  <h5>{initialData.name}</h5>
                  <h6>{initialData.hall}</h6>
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a className={`nav-link ${activeTab === 'about' ? 'active' : ''}`} onClick={() => handleTabChange('about')}>About</a>
                    </li>
                    <li className="nav-item">
                      <a className={`nav-link ${activeTab === 'history' ? 'active' : ''}`} onClick={() => handleTabChange('history')}>History</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2">
                <IconButton
                  isRound={true}
                  variant='solid'
                  bg='black'
                  _focus={{ boxShadow: 'none' }}
                  _focusVisible={{ boxShadow: 'none' }}
                  color="white"
                  aria-label='Edit Profile'
                  fontSize='20px'
                  icon={<EditIcon />}
                  onClick={() => setIsOpen(true)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-8">
                <div className="tab-content profile-tab" id="myTabContent">
                  {activeTab === 'about' && (
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                      <div className="row">
                        <div className="col-md-6">
                          <label>Name</label>
                        </div>
                        <div className="col-md-6">
                          <p>{initialData.name}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Email</label>
                        </div>
                        <div className="col-md-6">
                          <p>{initialData.email}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Contact</label>
                        </div>
                        <div className="col-md-6">
                          <p>{initialData.contact}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === 'history' && (
                    <div className="tab-pane fade show active" id="history" role="tabpanel" aria-labelledby="profile-tab">
                      <div className="row">
                        <div className="col-md-6">
                          <label>Buying History</label>
                        </div>
                        <div className="col-md-6">
                          {initialData.buying_summary && initialData.buying_summary.map((item, index) => (
                            <p key={index}>
                              <Link to={`/product/${item.category}/${index}`} style={{ color: '#494F55' }}>{item.product}</Link>
                            </p>
                          ))}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Selling History</label>
                        </div>
                        <div className="col-md-6">
                          {initialData.selling_summary && initialData.selling_summary.map((item, index) => (
                            <p key={index}>
                              <Link to={`/product/${item.category}/${index}`} style={{ color: '#494F55' }}>{item.product}</Link>
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={handleCancel}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={formData.name} onChange={handleChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input name="email" value={formData.email} onChange={handleChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Contact</FormLabel>
              <Input name="contact" value={formData.contact} onChange={handleChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Hall</FormLabel>
              <Input name="hall" value={formData.hall} onChange={handleChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Input type="file" onChange={handleImageChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Userprofile;
