import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, Progress, Badge } from 'reactstrap';

function SubstitutesModal(props) {
    const substitutesRendered = Object.keys(props.substitutes).map(i => (
        <ListGroupItem key={props.substitutes[i]}>
            {i.replace('_', ' ')}
            <Badge>{Math.round(props.substitutes[i] * 100)}%</Badge>
            <Progress
                animated
                value={props.substitutes[i] * 100} />
        </ListGroupItem>));

    return (
        <div>
            <Modal
                isOpen={props.show}
                modalTransition={{ timeout: 20 }}
                backdropTransition={{ timeout: 10 }}
                toggle={props.toggle}
                style={{ margin: '25vh auto' }}
                className={props.className}>
                <ModalHeader toggle={props.toggle}><b>{props.ingredient}</b> can be substituted with</ModalHeader>
                <ModalBody>
                    <ListGroup>
                        {substitutesRendered}
                    </ListGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={props.toggle}>Ok</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}


export default SubstitutesModal;
