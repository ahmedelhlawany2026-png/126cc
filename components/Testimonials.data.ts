export interface Testimonial {
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  companyTag: 'bio' | 'home' | 'vec';
  quoteAr: string;
  quoteEn: string;
  rating: number;
}

export const defaultTestimonials: Testimonial[] = [
  {
    nameAr: 'م. أحمد كامل', nameEn: 'Eng. Ahmed Kamel',
    roleAr: 'مدير مرفق طبي', roleEn: 'Medical Facility Director',
    companyTag: 'bio',
    quoteAr: 'بجد فريق محترم قوي، من أول يوم حسّينا إنهم فاهمين متطلبات المكان الطبي صح، ومكنش فيه أي تهاون في التفاصيل.',
    quoteEn: 'Genuine commitment to medical standards from day one, with clear communication throughout execution.',
    rating: 5
  },
  {
    nameAr: 'سارة المصري', nameEn: 'Sara El-Masry',
    roleAr: 'صاحبة فيلا', roleEn: 'Villa Owner',
    companyTag: 'home',
    quoteAr: 'التشطيب طلع أحلى بكتير من اللي في دماغي، والفريق كان دقيق في المواعيد ومش بيقصر في أي حاجة طلبناها.',
    quoteEn: 'The finishing exceeded expectations, and the team was punctual and attentive to every detail we asked for.',
    rating: 5
  },
  {
    nameAr: 'م. كريم عادل', nameEn: 'Eng. Karim Adel',
    roleAr: 'مطوّر عقاري', roleEn: 'Real Estate Developer',
    companyTag: 'vec',
    quoteAr: 'فريق هندسي شاطر جدًا، من التصميم لحد التراخيص، وإدارة المشروع كانت واضحة معانا من أول لحظة.',
    quoteEn: 'A professional engineering team, from design through licensing, with clear project management from the start.',
    rating: 5
  },
  {
    nameAr: 'د. منى فريد', nameEn: 'Dr. Mona Farid',
    roleAr: 'مديرة معمل تحاليل', roleEn: 'Laboratory Director',
    companyTag: 'bio',
    quoteAr: 'فاهمين متطلبات السلامة الحيوية صح، ونفّذوا من غير ما يأثروا على شغل المعمل ولا يوم واحد.',
    quoteEn: 'A precise understanding of biosafety requirements, delivered without disrupting the lab’s schedule.',
    rating: 5
  },
  {
    nameAr: 'محمد رشدي', nameEn: 'Mohamed Roshdy',
    roleAr: 'مالك شقة', roleEn: 'Apartment Owner',
    companyTag: 'home',
    quoteAr: 'من المعاينة لحد التسليم كل حاجة كانت مكتوبة وواضحة قدامنا، وده اللي خلانا مطمنين طول المشروع.',
    quoteEn: 'From the site visit to handover, everything was clear and documented — that gave me confidence throughout.',
    rating: 5
  },
  {
    nameAr: 'شريف توفيق', nameEn: 'Sherif Tawfik',
    roleAr: 'مدير تشغيل، سلسلة متاجر', roleEn: 'Operations Manager, Retail Chain',
    companyTag: 'vec',
    quoteAr: 'التنسيق بين التصميم والتنفيذ كان تمام في كل الفروع، ووفّر علينا وقت وجهد كبير جدًا.',
    quoteEn: 'Coordination between design and execution was seamless across all our branches, saving us significant time.',
    rating: 5
  },
  {
    nameAr: 'هالة عبد الرحمن', nameEn: 'Hala Abdel Rahman',
    roleAr: 'صاحبة عيادة', roleEn: 'Clinic Owner',
    companyTag: 'bio',
    quoteAr: 'العيادة طلعت زي ما نفسي فيها بالظبط، وحسيت إنهم بيتعاملوا مع المكان كأنه مكانهم مش شغلانة وخلاص.',
    quoteEn: 'The clinic turned out exactly as I envisioned, and the team treated the space with real care and ownership.',
    rating: 5
  }
];
