import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import React from 'react';


export default class NavigationMenu extends React.Component {
    state = { activeItem: this.props.location.pathname }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name }, () => {
            this.props.history.push(`/${name}`)
        })
    }

    render() {
        const { activeItem } = this.state

        return (
            <Segment inverted id="navigation-menu">
                <Menu inverted pointing secondary>
                    <Menu.Item
                        name='categories'
                        active={activeItem === '/'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='terms'
                        active={activeItem === '/terms'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='tags'
                        active={activeItem === '/tags'}
                        onClick={this.handleItemClick}
                    />
                </Menu>
            </Segment>
        )
    }
}