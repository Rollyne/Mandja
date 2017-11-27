import React from 'react';

export default function RecipeRating() {
    return (
        <figure style={{
            position: 'absolute',
            right: '15px',
            marginTop: 0,
        }}>
            <figcaption className="ratings">
                <p>
                    <a href="">
                        <span className="fa fa-star-o" />
                    </a>
                    <a href="">
                        <span className="fa fa-star-o" />
                    </a>
                    <a href="">
                        <span className="fa fa-star-o" />
                    </a>
                    <a href="">
                        <span className="fa fa-star-o" />
                    </a>
                    <a href="">
                        <span className="fa fa-star-o" />
                    </a>
                </p>
            </figcaption>
        </figure >

    );
}
