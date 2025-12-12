import { motion } from 'framer-motion';
import type { FC } from 'react';
import CategoriesIcon from '../../../assets/img/svg/CategoriesIcon';
import CommunityIcon from '../../../assets/img/svg/CommunityIcon';
import HomeIcon from '../../../assets/img/svg/HomeIcon';
import ProfileIcon from '../../../assets/img/svg/ProfileIcon';
import ButtonIcon from '../../ui/button-icon/ButtonIcon';
import style from './BottomNavigation.module.scss';

const BottomNavigation: FC = () => {
    return (
        <motion.nav 
            initial={{ y: 120, opacity: 0, x: '-50%' }}
            animate={{ y: -20, opacity: 1, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 100, damping: 35, delay: 0.75, duration: 0.3 }}
            className={style.wrapper}
        >
            <ButtonIcon variant='whiteIcon'>
                <HomeIcon />
            </ButtonIcon>
            <ButtonIcon variant='whiteIcon'>
                <CommunityIcon />
            </ButtonIcon>
            <ButtonIcon variant='whiteIcon'>
                <CategoriesIcon />
            </ButtonIcon>
            <ButtonIcon variant='whiteIcon'>
                <ProfileIcon />
            </ButtonIcon>
        </motion.nav>
    )
}

export default BottomNavigation;