import { Avatar, Input, List } from 'antd';
import React, { useEffect } from 'react';
import { getData } from '../../services';
import { User } from '../../model';
import { AVATAR_URL, USER_URL } from '../../constant';
import './index.css';
const SearchPage: React.FC = () => {
    const [userData, setUserData] = React.useState<User[]>([]);
    const [displayData, setDisplayData] = React.useState<User[]>([]);
    useEffect(() => {
        getData(USER_URL).then((data) => {
            setUserData(data)
            setDisplayData(data)
        });
    }, []);

    const updateUserWithWordSearch = (searchTerm: string) => {
        // debounce(() => {
        if (!searchTerm) {
            setDisplayData(userData);
        }
        console.log(searchTerm);

        // Filter the data based on the search term
        const filteredData = userData.filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Update the userData state with the filtered data
        setDisplayData(filteredData);
    // }, 300);
    };
    return (
        <div className='container' style={{padding:16}}>
            <h1>Welcome to the Search page!</h1>
            <Input className='search_input' placeholder='Search by user name' onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                updateUserWithWordSearch(event.target.value)
            }></Input>
            <List
            grid={{
                gutter: 8,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 2,
                xl: 4,
                xxl: 5,
              }}
                itemLayout="horizontal"
                dataSource={displayData}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={`${AVATAR_URL}${index}`} />}
                            title={<p>{item.name}</p>}
                            description={<div>
                                <p>{item.email}</p>
                                <p>{item.phone}</p>
                            </div>}

                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default SearchPage;
