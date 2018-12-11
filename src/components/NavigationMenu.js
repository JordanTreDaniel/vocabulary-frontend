import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import React from 'react';


export default class NavigationMenu extends React.Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Segment inverted id="navigation-menu">
                <Menu inverted pointing secondary>
                    <Link to="/">
                        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                    </Link>
                    <Link to="/categories">
                        <Menu.Item
                            name='categories'
                            active={activeItem === 'categories'}
                            onClick={this.handleItemClick}
                        />
                    </Link>
                    <Link to="/terms">
                        <Menu.Item
                            name='terms'
                            active={activeItem === 'terms'}
                            onClick={this.handleItemClick}
                        />
                    </Link>
                    <Link to="/tags">
                        <Menu.Item
                            name='tags'
                            active={activeItem === 'tags'}
                            onClick={this.handleItemClick}
                        />
                    </Link>
                </Menu>
            </Segment>
        )
    }
}