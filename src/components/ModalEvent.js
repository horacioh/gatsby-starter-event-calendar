import React from 'react'
import { Layer, Box, Text, Button, Anchor } from 'grommet'
import { FormClose } from 'grommet-icons'
import format from 'date-fns/format'
import PropTypes from 'prop-types'
import Events from './Calendar/Events'
import Hover from './Hover'

const ModalEvent = ({ hideModal, currentDay, events }) => (
  <Layer
    position="center"
    onClickOutside={hideModal}
    onEsc={hideModal}
    modal
  >
    <Box
      direction="row"
      align="center"
      tag="header"
      elevation="small"
      justify="between"
    >
      <Text margin={{ left: 'small' }}>
        {format(new Date(currentDay), 'dddd D, MMMM')}
      </Text>
      <Button icon={<FormClose />} onClick={hideModal} />
    </Box>
    <Box
      direction="column"
      align="center"
      tag="section"
      margin="medium"
      gap="small"
    >
      {events
        .sort((eventA, eventB) => new Date(eventA.date) - new Date(eventB.date))
        .map(event => (
          <Box elevation="small" direction="row">
            <Text a11yTitle="time" margin="small">
              {format(new Date(event.date).setUTCMinutes(180), 'HH:mm')}
            </Text>
            <Box margin="small">
              <Text a11yTitle="event name" weight="bold" size="large">
                {event.eventName}
              </Text>

              {event.place && (
                <Text a11yTitle="event place">{event.place}</Text>
              )}

              <Box margin={{ top: 'medium' }} width="xsmall">
                <Button
                  href={event.eventLink}
                  label="Link"
                  a11yTitle="event link"
                  target="_blank"
                />
              </Box>
            </Box>
          </Box>
        ))}
    </Box>
  </Layer>
)

ModalEvent.propTypes = {
  hideModal: PropTypes.func.isRequired,
  currentDay: PropTypes.string,
  events: Events.propTypes.events,
}

export default ModalEvent
