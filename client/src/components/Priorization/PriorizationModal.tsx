import { FC, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { prioritizeAdvert } from '../../api/collections/advert';
import { LoginContext } from '../../contexts/LoginContext';


import { palette } from '../../utils/colors';
import { BodyText } from '../Text/BodyText';
import { Tickets } from './Tickets';

type PriorizationModalProps = {
  isShowing: boolean;
  onClose: (rerender: boolean) => void;
  advertID: string;
};
const PriorizationModal: FC<PriorizationModalProps> = (props) => {
  const { user } = useContext(LoginContext);
  const navigate = useNavigate();
  const handleBoost = async () => {
    try {
      await prioritizeAdvert(props.advertID)
      props.onClose(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      show={props.isShowing}
      onHide={() => props.onClose(false)}
      centered
      size="lg"
    >
      <Modal.Header
        closeButton
        style={{
          borderBottom: 'none',
        }}
      />
      <Modal.Body>
        {user?.prioritisationTickets && user.prioritisationTickets > 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '30px',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: 20,
              }}
            >
              <BodyText
                style={{
                  fontWeight: 600,
                }}
              >
                Remaining Tickets:{' '}
              </BodyText>
              {Tickets(user.prioritisationTickets)}
            </div>
            {user.subscription?.type && (
              <div
                style={{
                  display: 'flex',
                  gap: 20,
                }}
              >
                <BodyText
                  style={{
                    fontWeight: 600,
                  }}
                >
                  Current Plan: {user.subscription?.type}
                </BodyText>
              </div>
            )}
            <div>
              <BodyText
                style={{
                  fontWeight: 400,
                  textAlign: 'center',
                }}
              >
                Would you like to use 1 ticket to boost your advert?
              </BodyText>
            </div>
          </div>
        ) : (
          <div>
            <BodyText
              style={{
                fontWeight: 400,
              }}
            >
              You have no more tickets left, would you like to purchase more
              tickets?
            </BodyText>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer
        style={{
          borderTop: 'none',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          className="text-white"
          onClick={() => props.onClose(false)}
          style={{
            background: palette.subSectionsBgAccent,
            borderColor: palette.subSectionsBgAccent,
          }}
        >
          No
        </Button>
        <Button
          className="text-white"
          onClick={
            user?.prioritisationTickets && user.prioritisationTickets > 0
              ? handleBoost
              : () => navigate('/userInfo?Premium')
          }
          style={{
            background: palette.green,
            borderColor: palette.green,
          }}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { PriorizationModal };
