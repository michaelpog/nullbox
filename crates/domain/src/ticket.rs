use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use uuid::Uuid;

use crate::status::UnknownVariant;
use crate::{AnonIdentity, SystemEvent, TicketStatus};

/// How on fire things are. Funny labels are UI-only.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize, TS)]
#[serde(rename_all = "snake_case")]
#[ts(export)]
pub enum Severity {
    P1,
    P2,
    P3,
    P4,
}

impl Severity {
    pub const ALL: [Severity; 4] = [Self::P1, Self::P2, Self::P3, Self::P4];

    pub fn as_str(self) -> &'static str {
        match self {
            Self::P1 => "p1",
            Self::P2 => "p2",
            Self::P3 => "p3",
            Self::P4 => "p4",
        }
    }
}

impl std::str::FromStr for Severity {
    type Err = UnknownVariant;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Self::ALL.into_iter().find(|severity| severity.as_str() == s).ok_or_else(|| UnknownVariant(s.to_owned()))
    }
}

/// What kind of job it is. Decides which handymen can take it. Labels are UI-only.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize, TS)]
#[serde(rename_all = "snake_case")]
#[ts(export)]
pub enum Category {
    Plumbing,
    Electrical,
    Gas,
    AirConditioning,
    Moving,
}

impl Category {
    pub const ALL: [Category; 5] = [Self::Plumbing, Self::Electrical, Self::Gas, Self::AirConditioning, Self::Moving];

    pub fn as_str(self) -> &'static str {
        match self {
            Self::Plumbing => "plumbing",
            Self::Electrical => "electrical",
            Self::Gas => "gas",
            Self::AirConditioning => "air_conditioning",
            Self::Moving => "moving",
        }
    }
}

impl std::str::FromStr for Category {
    type Err = UnknownVariant;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Self::ALL.into_iter().find(|category| category.as_str() == s).ok_or_else(|| UnknownVariant(s.to_owned()))
    }
}

/// When the customer would like the visit.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize, TS)]
#[serde(rename_all = "snake_case")]
#[ts(export)]
pub enum PreferredTime {
    WeekdayMorning,
    WeekdayAfternoon,
    WeekdayEvening,
    Weekend,
    AnyTime,
}

impl PreferredTime {
    pub const ALL: [PreferredTime; 5] =
        [Self::WeekdayMorning, Self::WeekdayAfternoon, Self::WeekdayEvening, Self::Weekend, Self::AnyTime];

    pub fn as_str(self) -> &'static str {
        match self {
            Self::WeekdayMorning => "weekday_morning",
            Self::WeekdayAfternoon => "weekday_afternoon",
            Self::WeekdayEvening => "weekday_evening",
            Self::Weekend => "weekend",
            Self::AnyTime => "any_time",
        }
    }
}

impl std::str::FromStr for PreferredTime {
    type Err = UnknownVariant;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Self::ALL.into_iter().find(|time| time.as_str() == s).ok_or_else(|| UnknownVariant(s.to_owned()))
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, TS)]
#[serde(rename_all = "snake_case")]
#[ts(export)]
pub enum AuthorKind {
    Customer,
    Worker,
    System,
}

impl AuthorKind {
    pub fn as_str(self) -> &'static str {
        match self {
            Self::Customer => "customer",
            Self::Worker => "worker",
            Self::System => "system",
        }
    }
}

impl std::str::FromStr for AuthorKind {
    type Err = UnknownVariant;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        [Self::Customer, Self::Worker, Self::System]
            .into_iter()
            .find(|kind| kind.as_str() == s)
            .ok_or_else(|| UnknownVariant(s.to_owned()))
    }
}

/// A support ticket. The access token hash is deliberately not part of this type:
/// it never leaves the repository.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, TS)]
#[ts(export)]
pub struct Ticket {
    pub id: Uuid,
    /// Human-readable, sequential. #404 is special in the UI.
    #[ts(type = "number")]
    pub number: i64,
    pub subject: String,
    pub body: String,
    pub severity: Severity,
    /// Null for tickets created before categories existed.
    pub category: Option<Category>,
    pub preferred_time: Option<PreferredTime>,
    pub status: TicketStatus,
    pub customer_name: Option<String>,
    pub customer_email: Option<String>,
    /// Set for anonymous customers instead of `customer_name`.
    pub anon: Option<AnonIdentity>,
    pub assignee_name: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub closed_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, TS)]
#[ts(export)]
pub struct Message {
    pub id: Uuid,
    pub ticket_id: Uuid,
    pub author_kind: AuthorKind,
    /// Workers and named customers. Null for anonymous customers and system messages.
    pub author_name: Option<String>,
    /// Empty for system messages: the frontend renders `system_event` instead.
    pub body: String,
    /// Internal notes are only visible to workers.
    pub internal: bool,
    pub system_event: Option<SystemEvent>,
    pub created_at: DateTime<Utc>,
}
