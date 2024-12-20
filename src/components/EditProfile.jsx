import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import SERVER_URL from '../services/serverUrl'
import { updateUserAPI } from '../services/allApi';

const EditProfile = ({fetchUserDetails}) => {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState('');
  const [existingProfileImg, setExistingProfileImg] = useState('');
  const [userDetails, setUserDetails] = useState({username: '', phone: '', address: '', profilePic: '',});

  useEffect(() => {
    if (open && sessionStorage.getItem('user')) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      setUserDetails({
        username: user.username,
        phone: user.phone,
        address: user.address,
        profilePic: '', // Do not pre-set profilePic here; handle in second useEffect
      });
      setExistingProfileImg(user.profilePic);
    }
  }, [open]);

  useEffect(() => {
    if (userDetails.profilePic) {
      setPreview(URL.createObjectURL(userDetails.profilePic));
    } else {
      setPreview('');
    }
  }, [userDetails.profilePic]);

  const handleUpdateProfile = async () => {
    const { username, phone, address, profilePic } = userDetails;
    if (username && phone && address) {
      const reqBody = new FormData();
      reqBody.append('username', username);
      reqBody.append('phone', phone);
      reqBody.append('address', address);
      preview ? reqBody.append('profilePic', profilePic) : reqBody.append('profilePic', existingProfileImg);

      const token = sessionStorage.getItem('token');
      if (token) {
        const reqHeader = {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        };

        // API call to update user profile
        try {
          const result = await updateUserAPI(reqBody, reqHeader);
          if (result.status === 200) {
            alert('Profile Updated Successfully');
            sessionStorage.setItem('user', JSON.stringify(result.data));
            fetchUserDetails()
            setOpen(!open); 
          } else {
            console.log(result);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      alert('Please fill the form completely!');
    }
  };
  return (
    <>
        
        <button onClick={() => setOpen(true)} className="btn btn-primary text-white fw-bold px-4 py-2 rounded-3 profile-edit-btn">
             <i className="fas fa-pencil-alt me-2"></i>Edit Profile
        </button>

        <Modal show={open} onHide={() => setOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="text-center mb-4">
              <label>
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => setUserDetails({ ...userDetails, profilePic: e.target.files[0] })}
                />
                <img
                  width="150px"
                  height="150px"
                  className="rounded-circle"
                  src={preview ? preview : existingProfileImg ? `${SERVER_URL}/uploads/${existingProfileImg}` : 'https://via.placeholder.com/150'}
                  alt="Profile"
                />
              </label>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={userDetails.username}
                onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your phone number"
                value={userDetails.phone}
                onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={userDetails.address}
                onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProfile