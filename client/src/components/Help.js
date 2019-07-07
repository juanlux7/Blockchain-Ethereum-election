import React, {Component} from 'react'
import { Accordion, Icon, Header, Image } from 'semantic-ui-react';


export default class Help extends Component {

    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
      const { index } = titleProps
      const { activeIndex } = this.state
      const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
    } 

  render() {
    const { activeIndex } = this.state
    return (
      <div className="container ui">

<Header as='h2' icon textAlign='center'>
      <Icon name='help circle' circular />
      <Header.Content>Frequently Asked Questions</Header.Content>
    </Header>

  <Accordion>
    <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
      <Icon name='dropdown' />
      How to Vote?
    </Accordion.Title>
    <Accordion.Content active={activeIndex === 0}>
      <p>
       <strong>In order to be able to cast a valid vote, you need to click in the Vote button. After that, a window
       will be displayed in the right corner of the screen and you will be able to confirm your vote.</strong>
      </p>
    </Accordion.Content>

    <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
      <Icon name='dropdown' />
      Can I read the electoral program of the candidates before voting?
    </Accordion.Title>
    <Accordion.Content active={activeIndex === 2}>
      <p>
        <strong>Bellow the picture of each candidate there is a button called 'show more info'. If you click that button,
        a window will be displayed with the relevant information of each candidate.</strong>
      </p>
     
    </Accordion.Content>

    <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
      <Icon name='dropdown' />
      How am I sure if my vote was correctly emitted?
    </Accordion.Title>
    <Accordion.Content active={activeIndex === 1}>
      <p>
        <strong>When you perform an act of emmiting your vote, the page will be refreshed and now your vote will be part 
        of the counting process. This technology guarantees a transparency with your personal data, since there is no
        real data computed inside this program.</strong>
      </p>
    </Accordion.Content>

    <Accordion.Title active={activeIndex === 4} index={4} onClick={this.handleClick}>
      <Icon name='dropdown' />
      Can I vote twice?
    </Accordion.Title>
    <Accordion.Content active={activeIndex === 4}>
      <p>
        <strong>Like in any democracy in the world, you are not able to vote more than one time. Anytime you vote, your address
        will be registered with a marker and you won't be able to vote again in this election.</strong>
      </p>
     
    </Accordion.Content>

    <Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClick}>
      <Icon name='dropdown' />
      Do I have the possibility to ask for help if I am unable to understand this process?
    </Accordion.Title>
    <Accordion.Content active={activeIndex === 3}>
      <p>
        In this case, a person will be helping you with any kind of help regarding this process. If you need help, try to contact
        the workers inside this room.
      </p>
     
    </Accordion.Content>
  </Accordion>
        
      </div>
    )
  }
}

