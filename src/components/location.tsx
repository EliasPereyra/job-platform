import LocationIcon from "./icons/location-icon";

import styles from "./location.module.css";

export default function Location({
  color = "#fdf4ff",
  location,
}: {
  color?: string;
  location: string;
}) {
  return (
    <div className={styles.location}>
      <LocationIcon color={color} arialabel="Icono de ubicacion" />
      <p style={{ color: color }} className={styles.locationText}>
        {location}
      </p>
    </div>
  );
}
