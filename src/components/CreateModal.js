import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from 'moment';
import { createTodo } from '../api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'center',
};

const textFieldStyle = {
  width: '260px',
};

export default function CreateModal({ selectedDate, isOpen, isCreated }) {
  const [open, setOpen] = React.useState(true);
  const selectedDateOnly = moment(selectedDate, 'DD-MM-YY');
  const [formData, setFormData] = React.useState({
    title: '',
    completed: false,
    startTime: null,
    endTime: null,
  });

  const handleClose = () => {
    setOpen(false);
    isOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStartTimeChange = (time) => {
    setFormData((prevData) => ({
      ...prevData,
      startTime: time,
    }));
  };

  const handleEndTimeChange = (time) => {
    setFormData((prevData) => ({
      ...prevData,
      endTime: time,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formattedData = {
      ...formData,
      start: formData.startTime
        ? moment(
            `${selectedDateOnly.format('DD-MM-YY')} ${moment(
              formData.startTime
            ).format('HH:mm')}`,
            'DD-MM-YY HH:mm'
          ).toDate()
        : null,
      end: formData.endTime
        ? moment(
            `${selectedDateOnly.format('DD-MM-YY')} ${moment(
              formData.endTime
            ).format('HH:mm')}`,
            'DD-MM-YY HH:mm'
          ).toDate()
        : null,
    };

    try {
      await createTodo(formattedData);
      isCreated('success');
    } catch (e) {
      isCreated('error');
    } finally {
      handleClose();
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={formStyle}>
            Create Todo on {selectedDateOnly.format('DD-MM-YY')}
          </Typography>
          <form style={formStyle} onSubmit={handleSubmit}>
            <TextField
              name="title"
              required
              id="outlined-basic"
              label="Title"
              variant="outlined"
              style={textFieldStyle}
              onChange={handleChange}
            />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DemoContainer components={['TimePicker']}>
                <TimePicker
                  label="Start Time"
                  style={textFieldStyle}
                  value={formData.startTime || null}
                  onChange={(time) => handleStartTimeChange(time)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DemoContainer components={['TimePicker']}>
                <TimePicker
                  label="End Time"
                  style={textFieldStyle}
                  value={formData.endTime || null}
                  onChange={(time) => handleEndTimeChange(time)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <Button type="submit">Submit</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
