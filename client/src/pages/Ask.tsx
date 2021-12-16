import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Typography, Box } from '@material-ui/core';
import { Select, MenuItem } from '@material-ui/core';
import { PostI } from '../interfaces';
import { UserI } from '../interfaces';
import { addPost, getMyProfile } from '../api';
import {
  CustomButton,
  CustomTextField,
  FormWrapper,
  Layout,
  useFormStyles,
} from '../components';

export const Ask: React.FC = () => {
  const [tag1, setTag1] = useState<string>();
  const [tag2, setTag2] = useState<string>();
  const [tag3, setTag3] = useState<string>();

  const [postinfo, setPostInfo] = useState<PostI>({
    title: '',
    content: '',
    category: '',
  });

  const styles = useFormStyles();
  var tags = [] as string[];

  const [profile, setProfile] = useState<UserI>();

  useEffect(() => {
    const getProfileFnc = async () => {
      const { data } = await getMyProfile();
      setProfile(data);
    };

    try {
      getProfileFnc();
    } catch (error) {}
  }, []);

  const createPost = async (e: any) => {
    e.preventDefault();

    try {
      console.log(tags);
      console.log(postinfo);
      const { data } = await addPost(postinfo);
      toast.success('Nowy post został dodany pomyślnie!');
      window.location.assign('./');
    } catch (error) {
      toast.error('Nie udało się dodać posta!');
    }
  };

  const handleChange = (event: any) => {
    setPostInfo({ ...postinfo, category: event.target.value });
  };

  return (
    <>
      <Layout>
        <FormWrapper title='Dodaj pytanie!'>
          <form onSubmit={createPost} className={styles.form}>
            <CustomTextField
              label='Tytuł *'
              variant='standard'
              color='secondary'
              onChange={(e) =>
                setPostInfo({ ...postinfo, title: e.currentTarget.value })
              }
              value={postinfo.title}
            />
            <CustomTextField
              label='Treść pytania *'
              variant='standard'
              multiline
              maxRows={6}
              color='secondary'
              onChange={(e) =>
                setPostInfo({ ...postinfo, content: e.currentTarget.value })
              }
              value={postinfo.content}
            />
            <p></p>
            <label className={styles.infoAsk}>Kategoria *</label>
            <Select
              className={styles.infoAsk}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={postinfo.category}
              label='Kategoria'
              onChange={handleChange}
            >
              <MenuItem value={'Chirurgia'}>Chirurgia</MenuItem>
              <MenuItem value={'Dermatologia'}>Dermatologia</MenuItem>
              <MenuItem value={'Endokrynologia'}>Endokrynologia</MenuItem>
              <MenuItem value={'Gastrologia'}>Gastrologia</MenuItem>
              <MenuItem value={'Ginekologia'}>Ginekologia</MenuItem>
              <MenuItem value={'Kardiologia'}>Kardiologia</MenuItem>
              <MenuItem value={'Laryngologia'}>Laryngologia</MenuItem>
              <MenuItem value={'Neurologia'}>Neurologia</MenuItem>
              <MenuItem value={'Onkologia'}>Onkologia</MenuItem>
              <MenuItem value={'Ortopedia'}>Ortopedia</MenuItem>
              <MenuItem value={'Pediatria'}>Pediatria</MenuItem>
              <MenuItem value={'Psychiatria'}>Psychiatria</MenuItem>
              <MenuItem value={'Reumatologia'}>Reumatologia</MenuItem>
              <MenuItem value={'Urologia'}>Urologia</MenuItem>
              <MenuItem value={'Inne'}>Inne</MenuItem>
            </Select>
            <CustomButton
              type='submit'
              color='secondary'
              variant='contained'
              className={styles.button}
            >
              <Typography variant='button'>Zapytaj</Typography>
            </CustomButton>
            <p className={styles.infoAsk}>* wymagane</p>
          </form>
        </FormWrapper>
      </Layout>
    </>
  );
};
