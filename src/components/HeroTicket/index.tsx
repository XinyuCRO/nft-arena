import styles from "./index.module.css";

export const HeroTicket = () => {
  return <div>
    <div className={styles.ticket}>
      <div data-number="20211225">NFT<br />NFT</div>
    </div>
    <div className={styles.ticket}>
      <div data-number="20211225">Crypto.com <br />Arena</div>
    </div>
  </div>
}
