import { displayLang } from '@/lib/lang'
import {
    getPhilosophyHeadings,
    getPhilosophyText,
    getFaqHeading,
    getFaq,
    getFaqSmall
} from './actions'
import Philosophy from './_components/Philosophy'
import Faq from '../_components/Faq'
import styles from './page.module.css'

export default async function AboutPage({ searchParams }) {
    const params = await searchParams
    const lang = params.lang || 'am'

    const philosophyHeadings = await getPhilosophyHeadings(lang)
    const philosophyText = await getPhilosophyText(lang)
    const faqHeading = await getFaqHeading(lang)
    const faq = await getFaq(lang)
    const faqSmall = await getFaqSmall(lang)

    return (
        <div className={`container ${styles.page}`}>
            <Philosophy
                headings={philosophyHeadings}
                text={philosophyText}
            />

            <Faq
                small={faqSmall}
                heading={faqHeading}
                data={faq}
            />
        </div>
    )
}