'use client';

export default function FilterError({error}: {error: any}){
    return (
        <div>
            <h2>An error occurred!</h2>
            <p>
                {error.message}
            </p>
        </div>
    );
}