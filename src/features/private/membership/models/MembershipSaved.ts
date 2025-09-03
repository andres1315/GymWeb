import type { MembershipClientInfo } from "./MembershipClientInfo"

export interface MembershipSaved {
  id: number
  name: string
  description: string
  generate_payment: number
  generate_movement_exp_date: number
  generate_bill: number
  generate_code_customer: number
  controlled_plan: number
  required_list_members: number
  can_be_invited: number
  required_footprint: number
  has_assessment_physical_therapy: number
  required_gift_voucher: number
  admission_all_sites: number
  charge_registration: number
  controls_user_access: number
  max_entry_per_day: number
  max_day_per_week: number
  min_members_group_plan?: number
  max_members_group_plan?: number
  guest_monday: number
  guest_tuesday: number
  guest_wednesday: number
  guest_thursday: number
  guest_friday: number
  guest_saturday: number
  guest_sunday: number
  guest_holiday: number
  start_time_restriction?: string
  end_time_restriction?: string
  restrictionday_monday: number
  restrictionday_tuesday: number
  restrictionday_wednesday: number
  restrictionday_thursday: number
  restrictionday_friday: number
  restrictionday_saturday: number
  restrictionday_sunday: number
  restrictionday_holiday: number
  age_restriction_type: "major" | "minor" | undefined;
  age_restriction_value: number
  birthday_discount: number
  birthday_choose_gift_discount: number
  discount_early_payment: number
  discount_early_payment_first: number
  increase_arrears: number
  generate_payment_plan: number
  start_first_day_month: number
  contains_class_package: number
  issues_card: number
  capture_gift_voucher: number
  generate_cxc: number
  type_payment: number
  price_plan: number
  duration_days: string;
  percentage_discount: number
  cost_center: number
  is_active: number
  created_at: string
  updated_at: string
  membership_info:MembershipClientInfo
  active_clients_count: number
}