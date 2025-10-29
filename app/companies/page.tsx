import EnterpriseHero from "@/src/components/pages/enterprise/Hero";
import EnterpriseKPIs from "@/src/components/pages/enterprise/KPIs";
import EnterpriseReasons from "@/src/components/pages/enterprise/Reasons";
import EnterpriseProcess from "@/src/components/pages/enterprise/Process";
import EnterpriseContactCTA from "@/src/components/pages/enterprise/ContactCTA";

export default function CompaniesPage() {
  return (
    <>
      <EnterpriseHero />
      <EnterpriseKPIs />
      <EnterpriseReasons />
      <EnterpriseProcess />
      <EnterpriseContactCTA />
    </>
  );
}


