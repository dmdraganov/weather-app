import styles from './AstroForecast.module.scss';
import SectionHeading from '../../../../shared/ui/SectionHeading/SectionHeading';
import ListItem from '../../../../shared/ui/ListItem/ListItem';
import { useTranslation } from 'react-i18next';

import { IconName } from '../../../../shared/ui/Icon/icon-map';
import type { AstroData } from '../../models';
import { I18N_NAMESPACES } from '../../../../shared/config/i18n';
import { mapAstroForecast } from './AstroForecast.data';

interface AstroForecastProps {
  astroData: AstroData;
}

const AstroForecast = ({ astroData }: AstroForecastProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.weather);

  return (
    <section className={`${styles.container} division`}>
      <SectionHeading iconName={IconName.Clear} text={t('astro_forecast')} />
      <ul className={styles.list}>
        {mapAstroForecast(astroData).map((item) => (
          <ListItem
            key={item.titleKey}
            title={t(item.titleKey)}
            iconName={item.iconName}
            value={item.value}
            isVertical={true}
          />
        ))}
      </ul>
    </section>
  );
};

export default AstroForecast;
