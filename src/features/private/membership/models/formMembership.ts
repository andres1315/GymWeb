import z from "zod";

export const MembershipConfigSchema = z
  .object({
    // Configuración Principal
    name: z.string({ error: "Ingrese un Nombre para el plan" }).trim().min(1, { message: "Nombre es requerido" }),
    description: z.string().optional(),
    generate_payment: z.boolean(),
    generate_bill: z.boolean(),
    generate_code_customer: z.boolean(),
    generate_movement_exp_date: z.boolean(),
    controlled_plan: z.boolean(),
    required_list_members: z.boolean(),
    can_be_invited: z.boolean(),
    required_footprint: z.boolean(),
    has_assessment_physical_therapy: z.boolean(),
    required_gift_voucher: z.boolean(),
    admission_all_sites: z.boolean(),
    charge_registration: z.boolean(),
    controls_user_access: z.boolean(),
    duration_days: z.number(),

    // Control de Acceso
    max_entry_per_day: z
      .number()
      .min(1, {
        message: "Debe ser mayor a 0",
      })
      .max(10, {
        message: "Debe ser menor a 11",
      }),
    max_day_per_week: z
      .number()
      .min(0, {
        message: "Debe ser mayor un valor entre 0 y 7",
      })
      .max(7, {
        message: "Debe ser mayor un valor entre 0 y 7",
      }),
    min_members_group_plan: z
      .number()
      .min(0, {
        message: "Debe ser mayor un valor entre 0 y 10",
      })
      .max(10, {
        message: "Debe ser mayor un valor entre 0 y 10",
      })
      .optional(),
    max_members_group_plan: z
      .number()
      .min(0, {
        message: "Debe ser mayor un valor entre 0 y 10",
      })
      .max(10, {
        message: "Debe ser mayor un valor entre 0 y 10",
      })
      .optional(),
    guest_days: z.array(
      z.enum([
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
        "holiday",
      ])
    ),
    start_time_restriction: z.string().optional(),
    end_time_restriction: z.string().optional(),
    restriction_days: z.array(
      z.enum([
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
        "holiday",
      ])
    ),

    // Configuración Adicional
    birthday_discount: z.boolean(),
    birthday_choose_gift_discount: z.boolean(),
    discount_early_payment: z.boolean(),
    discount_early_payment_first: z.boolean(),
    increase_arrears: z.boolean(),
    generate_payment_plan: z.boolean(),
    start_first_day_month: z.boolean(),
    contains_class_package: z.boolean(),
    issues_card: z.boolean(),
    capture_gift_voucher: z.boolean(),
    generate_cxc: z.boolean(),

    // Configuración de Pagos
    type_payment: z.number({
      error: "Seleccione una forma de pago",
    }),
    cost_center: z.number("Seleccione un Centro de costo"),
    price_plan: z
      .number()
      .min(1, { error: "Ingrese Un valor para el plan" })
      .positive(),

    /* metodos_pago: z.array(
    z.enum(["Efectivo", "Tarjeta de Crédito", "Transferencia", "PayPal"])
  ), */

    percentage_discount: z
      .number()
      .min(0, {
        message: "Debe ser 0 o mayor",
      })
      .max(50, {
        message: "Debe ser 50 o menor",
      }),
    age_restriction_type: z.enum(["major", "minor"]).optional(),
    age_restriction_value: z.string().optional(),
  })
  .refine(
    (data) =>
      // Restriction Age Rule
      (!data.age_restriction_type &&
        (!data.age_restriction_value || data.age_restriction_value === 0)) ||
      (data.age_restriction_type &&
        data.age_restriction_value &&
        data.age_restriction_value > 0),
    {
      message:
        "Si seleccionas tipo de restricción de edad o valor de edad, ambos campos son obligatorios y la edad debe ser mayor a 0.",
      path: ["age_restriction_type"], // poner ambos campos si se quiere mostrar el error en ambos
    }
  )
  .refine(
    (data) =>
      // Si ambos son 0 o vacíos, está bien. Si uno es mayor a 0, el otro también debe ser mayor a 0.
      ((data.min_members_group_plan ?? 0) === 0 &&
        (data.max_members_group_plan ?? 0) === 0) ||
      ((data.min_members_group_plan ?? 0) > 0 &&
        (data.max_members_group_plan ?? 0) > 0),
    {
      message:
        "Si uno de los campos de integrantes mínimos o máximos es mayor a 0, el otro también debe ser mayor a 0.",
      path: ["min_members_group_plan"], // Puedes poner ambos campos si quieres mostrar el error en ambos
    }
  )
  .refine(
    (data) => {
      if (
        (data.min_members_group_plan ?? 0) > 0 &&
        (data.max_members_group_plan ?? 0) > 0
      ) {
        return (
          (data.max_members_group_plan ?? 0) >=
          (data.min_members_group_plan ?? 0)
        );
      }
      return true;
    },
    {
      message: "El máximo de integrantes no puede ser menor que el mínimo.",
      path: ["max_members_group_plan"],
    }
  )
  .refine(
    (data) =>
      // Ambos vacíos o ambos con valor
      (!data.start_time_restriction && !data.end_time_restriction) ||
      (data.start_time_restriction && data.end_time_restriction),
    {
      message:
        "Si seleccionas una hora de inicio o fin, ambos campos son obligatorios.",
      path: ["start_time_restriction"],
    }
  )
  .refine(
    (data) => {
      if (data.start_time_restriction && data.end_time_restriction) {
        // Compara los valores como strings "HH:mm"
        return data.end_time_restriction > data.start_time_restriction;
      }
      return true;
    },
    {
      message: "La hora de fin debe ser mayor a la hora de inicio.",
      path: ["end_time_restriction"],
    }
  );

export type FormMembership = z.infer<typeof MembershipConfigSchema>;